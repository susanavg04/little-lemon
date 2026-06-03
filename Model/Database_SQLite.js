import * as SQLite from 'expo-sqlite';


const API_URL =
  'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/menu-items-by-category.json';
const db = SQLite.openDatabaseSync('little_lemon.db');

// Functions for managing the SQLite database.

export async function createTable() {
  return db.execAsync(
          'create table if not exists menuitems (id integer primary key not null, uuid text unique, title text, price text, category text);'
        );
      }

// Get all menu items from the database.
export async function getMenuItems() {
  const rows = await db.getAllAsync('SELECT * FROM menuitems');
  return rows;
};

// Save menu items to the database, ignoring duplicates based on uuid.
export async function saveMenuItems(menuItems) {
  for (const item of menuItems) {
      try{
        await db.runAsync(
        'INSERT OR IGNORE INTO menuitems (uuid, title, price, category) VALUES (?, ?, ?, ?)',
        [item.id, item.title, item.price, item.category]
       );
      
      } catch (error) {
      console.log("Error insertando item:", error);
    }
  }
};
// Filter menu items by search query and active categories.
export async function filterByQueryAndCategories(query, activeCategories) {
  try {
    // Secure management of dynamic categories
    const placeholders = activeCategories.map(() => 'category = ?').join(' OR ');
    
    let sql = `SELECT * FROM menuitems WHERE (${placeholders})`;
    let params = [...activeCategories];

    // If text search is available, we add the following parameters and modify the SQL query to include the text search condition
     if (query) {
      sql = `SELECT * FROM menuitems WHERE title LIKE ? AND (${placeholders})`;
      params = [`%${query}%`, ...activeCategories];
    }

    // Direct execution using Promise
    const allRows = await db.getAllAsync(sql, params);
    return allRows;
  } catch (error) {
    console.error("Error filtrando:", error);
    throw error;
  }
}

export async function getDishById(id) {
  try {
    // getFirstAsync es ideal para obtener un solo registro
    const row = await db.getFirstAsync(
      'SELECT * FROM menuitems WHERE uuid = ?', 
      [id]
    );
    return row;
  } catch (error) {
    console.error("Error obteniendo plato:", error);
    throw error;
  }
}

export async function fetchMenu() {
  await createTable();
  let menuItems = await getMenuItems();

  if (menuItems.length === 0) {
    const response = await fetch(API_URL);
    const json = await response.json();
    
    
    // Normalizamos los datos
    const normalizedItems = json.menu.map((item) => ({
      ...item,
      category: item.category.title,
    }));

    // Guardamos en SQLite
    await saveMenuItems(normalizedItems);

    // Volvemos a leer desde la DB
    menuItems = await getMenuItems();
  }
  return menuItems;
}
  
