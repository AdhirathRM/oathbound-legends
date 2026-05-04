require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors()); 
app.use(express.json()); 

// 1. Standard Client (For public reads)
const supabase = createClient(
  process.env.SUPABASE_URL, 
  process.env.SUPABASE_ANON_KEY
);

// 2. Admin Client (Bypasses security, uses Service Role Key)
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL, 
  process.env.SUPABASE_SERVICE_KEY
);

// ==========================================
// ROUTE 1: GET RANDOM LORE 
// ==========================================
app.get('/api/lore/random', async (req, res) => {
  try {
    const { data: lore, error } = await supabase
      .from('lore_entries')
      .select('*, profiles(username)');

    if (error) throw error;

    if (!lore || lore.length === 0) {
      return res.status(404).json({ message: "No lore found in the archives." });
    }

    const randomIndex = Math.floor(Math.random() * lore.length);
    res.json(lore[randomIndex]);

  } catch (error) {
    console.error("Server Error:", error.message);
    res.status(500).json({ error: "Failed to read the archives." });
  }
});

// ==========================================
// ROUTE 2: SECURE ADMIN PURGE 
// ==========================================
app.delete('/api/admin/purge/:table/:id', async (req, res) => {
  const { table, id } = req.params;
  const { adminId } = req.body; 

  try {
    if (!adminId) {
      return res.status(401).json({ error: "Unauthorized: No identification provided." });
    }

    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('is_admin')
      .eq('id', adminId)
      .single();

    if (profileError || !profile?.is_admin) {
      return res.status(403).json({ error: "Forbidden: You lack the Archivist privileges." });
    }

    const { error: deleteError } = await supabaseAdmin
      .from(table)
      .delete()
      .eq('id', id);

    if (deleteError) throw deleteError;

    res.json({ message: `Successfully purged record from ${table}` });

  } catch (error) {
    console.error("Admin Purge Error:", error.message);
    res.status(500).json({ error: "Failed to execute purge protocol." });
  }
});

// ==========================================
// ROUTE 3: GET MOST POPULAR LORE 
// ==========================================
app.get('/api/lore/popular', async (req, res) => {
  try {
    // Fetch top 3 entries sorted by view_count
    const { data, error } = await supabase
      .from('lore_entries')
      .select('*, profiles(username)')
      .order('view_count', { ascending: false })
      .limit(3);

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error("Popular Lore Error:", error.message);
    res.status(500).json({ error: "Failed to fetch popular lore." });
  }
});

// ==========================================
// ROUTE 4: READ LORE & INCREMENT VIEWS (Middleware Side-Effect)
// ==========================================
app.get('/api/lore/read/:slug', async (req, res) => {
  const { slug } = req.params;
  
  try {
    // 1. Fetch the requested lore entry
    const { data: lore, error: fetchError } = await supabase
      .from('lore_entries')
      .select('*, profiles(username)')
      .eq('slug', slug)
      .single();

    if (fetchError || !lore) {
      return res.status(404).json({ error: "Lore not found" });
    }

    // 2. Secretly calculate the new view count on the server
    const newViewCount = (lore.view_count || 0) + 1;
    
    // 3. Update the database using the Admin client so the user doesn't need edit permissions
    await supabaseAdmin
      .from('lore_entries')
      .update({ view_count: newViewCount })
      .eq('id', lore.id);

    // 4. Send the data (with the updated count) back to the React frontend
    res.json({ ...lore, view_count: newViewCount });

  } catch (error) {
    console.error("View Count Error:", error.message);
    res.status(500).json({ error: "Failed to read lore." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`◈ Oathbound Backend running on http://localhost:${port}`);
});