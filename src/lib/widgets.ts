import { supabase } from './supabaseClient';
import { defaultWidgetSettings } from './defaultSettings';

export const createWidget = async (name: string, settings: any = defaultWidgetSettings) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('widgets')
    .insert([{ user_id: user.id, name, settings }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getMyWidgets = async () => {
  const { data, error } = await supabase
    .from('widgets')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const updateWidget = async (id: string, updates: Partial<{ name: string; settings: any; is_public: boolean }>) => {
  const { data, error } = await supabase
    .from('widgets')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteWidget = async (id: string) => {
  const { error } = await supabase
    .from('widgets')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
};
