// ==========================================
// STORAGE SERVICE (LOCALSTORAGE & SUPABASE READY)
// ==========================================
import { createClient } from '@supabase/supabase-js';
import { PARTY_CONFIG } from '../config';

const STORAGE_KEYS = {
  BUFFET: 'alina_pirate_buffet_v3',
  WISHES: 'alina_pirate_wishes_v3',
  MESSAGES: 'alina_pirate_messages_v3'
};

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabaseClient = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export async function initStorage() {
  if (supabaseClient) {
    console.log('⚓ Supabase Verbindung aktiv!');
  } else {
    console.log('⚓ Supabase nicht konfiguriert, nutze LocalStorage.');
  }
}

// ------------------------------------------
// BUFFET ITEMS
// ------------------------------------------
export async function getBuffetItems() {
  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from('buffet_items')
        .select('*')
        .order('createdAt', { ascending: false });
      if (!error && data) return data;
      if (error) console.warn('Supabase getBuffetItems Hinweis:', error.message);
    } catch (e) {
      console.error(e);
    }
  }

  const stored = localStorage.getItem(STORAGE_KEYS.BUFFET);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
  }
  
  localStorage.setItem(STORAGE_KEYS.BUFFET, JSON.stringify(PARTY_CONFIG.initialBuffetItems));
  return PARTY_CONFIG.initialBuffetItems;
}

export async function addBuffetItem(item) {
  const newItem = {
    id: 'item-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
    createdAt: new Date().toISOString(),
    ...item
  };

  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient.from('buffet_items').insert([newItem]).select();
      if (!error && data && data.length > 0) return data[0];
      if (error) console.warn('Supabase addBuffetItem Hinweis:', error.message);
    } catch (e) {
      console.error(e);
    }
  }

  const current = await getBuffetItems();
  const updated = [newItem, ...current];
  localStorage.setItem(STORAGE_KEYS.BUFFET, JSON.stringify(updated));
  return newItem;
}

export async function removeBuffetItem(itemId) {
  if (supabaseClient) {
    try {
      const { error } = await supabaseClient.from('buffet_items').delete().eq('id', itemId);
      if (error) console.warn('Supabase removeBuffetItem Hinweis:', error.message);
    } catch (e) {
      console.error(e);
    }
  }

  const current = await getBuffetItems();
  const updated = current.filter(i => i.id !== itemId);
  localStorage.setItem(STORAGE_KEYS.BUFFET, JSON.stringify(updated));
  return updated;
}

// ------------------------------------------
// WISHES (SCHATZKISTE & ZUSAMMENLEGEN)
// ------------------------------------------
export async function getWishes() {
  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from('wishes')
        .select('*')
        .order('title', { ascending: true });
      if (!error && data) {
        return data.map(w => ({
          ...w,
          contributors: Array.isArray(w.contributors) ? w.contributors : []
        }));
      }
      if (error) console.warn('Supabase getWishes Hinweis:', error.message);
    } catch (e) {
      console.error(e);
    }
  }

  const stored = localStorage.getItem(STORAGE_KEYS.WISHES);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      return parsed.map(w => ({
        ...w,
        contributors: Array.isArray(w.contributors) ? w.contributors : []
      }));
    } catch (e) {
      console.error(e);
    }
  }

  localStorage.setItem(STORAGE_KEYS.WISHES, JSON.stringify(PARTY_CONFIG.initialWishes));
  return PARTY_CONFIG.initialWishes;
}

// Einzel-Wunsch reservieren
export async function claimWish(wishId, guestName) {
  if (supabaseClient) {
    try {
      const { error } = await supabaseClient
        .from('wishes')
        .update({
          claimedBy: guestName,
          claimedAt: new Date().toISOString()
        })
        .eq('id', wishId);
      if (!error) return await getWishes();
      if (error) console.warn('Supabase claimWish Hinweis:', error.message);
    } catch (e) {
      console.error(e);
    }
  }

  const wishes = await getWishes();
  const updated = wishes.map(wish => {
    if (wish.id === wishId) {
      return {
        ...wish,
        claimedBy: guestName,
        claimedAt: new Date().toISOString()
      };
    }
    return wish;
  });

  localStorage.setItem(STORAGE_KEYS.WISHES, JSON.stringify(updated));
  return updated;
}

// Einzel-Wunsch freigeben
export async function unclaimWish(wishId) {
  if (supabaseClient) {
    try {
      const { error } = await supabaseClient
        .from('wishes')
        .update({
          claimedBy: null,
          claimedAt: null
        })
        .eq('id', wishId);
      if (!error) return await getWishes();
      if (error) console.warn('Supabase unclaimWish Hinweis:', error.message);
    } catch (e) {
      console.error(e);
    }
  }

  const wishes = await getWishes();
  const updated = wishes.map(wish => {
    if (wish.id === wishId) {
      return {
        ...wish,
        claimedBy: null,
        claimedAt: null
      };
    }
    return wish;
  });

  localStorage.setItem(STORAGE_KEYS.WISHES, JSON.stringify(updated));
  return updated;
}

// Gruppen-Geschenk: Als Mitschenkender beitreten (Zusammenlegen!)
export async function contributeToWish(wishId, contributorName) {
  if (supabaseClient) {
    try {
      const wishes = await getWishes();
      const target = wishes.find(w => w.id === wishId);
      const list = Array.isArray(target?.contributors) ? target.contributors : [];
      if (!list.includes(contributorName)) {
        const nextList = [...list, contributorName];
        await supabaseClient
          .from('wishes')
          .update({ contributors: nextList })
          .eq('id', wishId);
      }
      return await getWishes();
    } catch (e) {
      console.error(e);
    }
  }

  const wishes = await getWishes();
  const updated = wishes.map(wish => {
    if (wish.id === wishId) {
      const list = Array.isArray(wish.contributors) ? wish.contributors : [];
      if (!list.includes(contributorName)) {
        return {
          ...wish,
          contributors: [...list, contributorName]
        };
      }
    }
    return wish;
  });

  localStorage.setItem(STORAGE_KEYS.WISHES, JSON.stringify(updated));
  return updated;
}

// Gruppen-Geschenk: Eigene Beteiligung aufheben
export async function removeContributorFromWish(wishId, contributorName) {
  if (supabaseClient) {
    try {
      const wishes = await getWishes();
      const target = wishes.find(w => w.id === wishId);
      const list = Array.isArray(target?.contributors) ? target.contributors : [];
      const nextList = list.filter(n => n !== contributorName);
      await supabaseClient
        .from('wishes')
        .update({ contributors: nextList })
        .eq('id', wishId);
      return await getWishes();
    } catch (e) {
      console.error(e);
    }
  }

  const wishes = await getWishes();
  const updated = wishes.map(wish => {
    if (wish.id === wishId) {
      const list = Array.isArray(wish.contributors) ? wish.contributors : [];
      return {
        ...wish,
        contributors: list.filter(n => n !== contributorName)
      };
    }
    return wish;
  });

  localStorage.setItem(STORAGE_KEYS.WISHES, JSON.stringify(updated));
  return updated;
}

// Neuen Wunsch anlegen
export async function addNewWish(title, description, isGroupGift = false) {
  const newWish = {
    id: 'wish-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
    title,
    description: description || '',
    isGroupGift,
    contributors: [],
    claimedBy: null,
    claimedAt: null
  };

  if (supabaseClient) {
    try {
      const { error } = await supabaseClient.from('wishes').insert([newWish]);
      if (!error) return await getWishes();
      if (error) console.warn('Supabase addNewWish Hinweis:', error.message);
    } catch (e) {
      console.error(e);
    }
  }

  const wishes = await getWishes();
  const updated = [...wishes, newWish];
  localStorage.setItem(STORAGE_KEYS.WISHES, JSON.stringify(updated));
  return updated;
}

// ------------------------------------------
// GUEST MESSAGES (FLASCHENPOST)
// ------------------------------------------
export async function getGuestMessages() {
  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from('guest_messages')
        .select('*')
        .order('createdAt', { ascending: false });
      if (!error && data) return data;
      if (error) console.warn('Supabase getGuestMessages Hinweis:', error.message);
    } catch (e) {
      console.error(e);
    }
  }

  const stored = localStorage.getItem(STORAGE_KEYS.MESSAGES);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
  }
  const defaults = [];
  localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(defaults));
  return defaults;
}

export async function addGuestMessage(sender, text) {
  const newMsg = {
    id: 'msg-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
    sender,
    text,
    createdAt: new Date().toISOString()
  };

  if (supabaseClient) {
    try {
      const { error } = await supabaseClient.from('guest_messages').insert([newMsg]);
      if (!error) return await getGuestMessages();
      if (error) console.warn('Supabase addGuestMessage Hinweis:', error.message);
    } catch (e) {
      console.error(e);
    }
  }

  const current = await getGuestMessages();
  const updated = [newMsg, ...current];
  localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(updated));
  return updated;
}
