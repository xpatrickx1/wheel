import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Header } from '../components/Header';
import Loader from '../ui/loader';

interface Lead {
  id: string;
  index: number;
  created_at: string;
  contact: string;
  prize: string;
  // url?: boolean;
}

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    }
    getUser();
  }, []);

  const path = window.location.pathname;
  const slug = path.match(/\/([^\/]+)$/)[1];

  useEffect(() => {
    async function fetchLeadsForWidget() {
      if (!user?.id || !slug) {
        console.error('Missing user ID or slug');
        setLoading(false);
        return;
      }
  
      setLoading(true);
      let widgetId: string;
  
      // Отримання widgetId за slug
      try {
        const API_BASE = 'https://ptulighepuqttsocdovp.supabase.co';
        const response = await fetch(`${API_BASE}/functions/v1/get-widget-id/${slug}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        const data = await response.json();
        if (!data.id) throw new Error('Widget ID not found');
        widgetId = data.id;
        console.log('Widget ID:', widgetId);
      } catch (error) {
        console.error('Error fetching widget ID:', error.message);
        setLoading(false);
        return;
      }
  
      // Запит до widget_results
      try {
        const { data, error } = await supabase
          .from('widget_results')
          .select('id, created_at, contact, prize')
          .eq('widget_id', widgetId); // Фільтруємо за widget_id
  
        if (error) throw error;

        const formattedData = data.map((lead: any) => ({
          ...lead,
          created_at: new Date(lead.created_at).toLocaleString('uk-UA', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }).replace(',', ''),
        }));

        setLeads((formattedData as Lead[]) || []);
      } catch (error) {
        console.error('Error fetching leads:', error.message);
      } finally {
        setLoading(false);
      }
    }
  
    fetchLeadsForWidget();
  }, [user?.id, slug]);

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto p-4 pt-[100px]">
        <h1 className="text-2xl font-bold mb-4">Заявки</h1>

        {loading ? (
          <Loader />
        ) : leads.length > 0 ? (
          <div className="space-y-2">
            <table className="table-auto w-full">
              <thead>
                <tr className="hover:bg-gray-600 transition pointer border-b border-gray-700 text-left">
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Дата</th>
                  <th className="px-4 py-2">Контакт</th>
                  <th className="px-4 py-2">Бонус</th>
                  <th className="px-4 py-2">URL</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, index) => (
                  <tr key={lead.id} className="hover:bg-gray-600 transition pointer border-b border-gray-700 text-left">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{lead.created_at}</td>
                    <td className="px-4 py-2">{lead.contact}</td>
                    <td className="px-4 py-2">{lead.prize}</td>
                    {/* <td className="px-4 py-2">{lead.url}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500">Заявок поки нема</p>
        )}
      </div>
    </>
  );
}