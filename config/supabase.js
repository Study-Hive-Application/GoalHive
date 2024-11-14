import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://sxmdizqawdjhqsihjvup.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4bWRpenFhd2RqaHFzaWhqdnVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAzNzcxMzEsImV4cCI6MjA0NTk1MzEzMX0.mrVXtwDZrXnPYf0ahkBJenAXvTJWZLhNnsVnFGWtpBM";
const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    // Attempt to retrieve data from a sample table or just check if client connects
    const { data, error } = await supabase
      .from("login_data")
      .select("*")
      .limit(1);
    if (error) {
      console.error("Supabase connection failed:", error.message);
    } else {
      console.log("Supabase is connected successfully!");
    }
  } catch (err) {
    console.error("Error testing Supabase connection:", err.message);
  }
}

export default { testConnection };
