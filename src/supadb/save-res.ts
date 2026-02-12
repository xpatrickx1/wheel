import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, x-client-info, apikey"
};
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "https://ptulighepuqttsocdovp.supabase.co";
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false
  }
});
serve(async (req)=>{
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
      status: 204
    });
  }
  if (req.method === "POST") {
    try {
      const body = await req.json();
      const { widget_id, contact, prize } = body;
      if (!widget_id || !contact || !prize) {
        return new Response(JSON.stringify({
          error: "Missing widget_id, contact, or prize"
        }), {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json"
          },
          status: 400
        });
      }
      const { error } = await supabase.from("widget_results").insert([
        {
          widget_id,
          contact,
          prize
        }
      ]);
      if (error) {
        console.error("Database error:", error);
        return new Response(JSON.stringify({
          error: error.message
        }), {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json"
          },
          status: 500
        });
      }
      return new Response(JSON.stringify({
        success: true
      }), {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        },
        status: 200
      });
    } catch (error) {
      console.error("Server error:", error);
      return new Response(JSON.stringify({
        error: String(error)
      }), {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        },
        status: 500
      });
    }
  }
  return new Response(JSON.stringify({
    error: "Method not allowed"
  }), {
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json"
    },
    status: 405
  });
});
