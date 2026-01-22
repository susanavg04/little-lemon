import * as SQLite from 'expo-sqlite';
const API_URL =
  'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/menu-items-by-category.json';
const db = SQLite.openDatabaseSync('little_lemon');


export async function createTable() {
  return db.executeSql(
          'create table if not exists menuitems (id integer primary key not null, uuid text unique, title text, price text, category text);'
        );
      }


export async function getMenuItems() {
  return await db.getAllAsync('SELECT * from menuitems', [], (_, { rows }) => {
        resolve(rows._array);
      });
};


export async function saveMenuItems(menuItems) {
  for (const item of menuItems) {
      try{
        await db.runAsync(
        'INSERT INTO menuitems (uuid, title, price, category) VALUES (?, ?, ?, ?)',
        [item.id, item.title, item.price, item.category]
       );
      
      } catch (error) {
      console.log("Error insertando item:", error);
    }
  }
};

export async function filterByQueryAndCategories(query, activeCategories) {
  try {
    // 1. Manejo de categorías dinámicas de forma segura
    const placeholders = activeCategories.map(() => 'category = ?').join(' OR ');
    
    let sql = `SELECT * FROM menuitems WHERE (${placeholders})`;
    let params = [...activeCategories];

    // 2. Si hay búsqueda por texto, añadimos a los parámetros
    if (query) {
      sql = `SELECT * FROM menuitems WHERE title LIKE ? AND (${placeholders})`;
      params = [`%${query}%`, ...activeCategories];
    }

    // 3. Ejecución directa con Promesa (sin tx.executeSql)
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
    menuItems = json.menu.map((item) => ({
      ...item,
      category: item.category.title,
    }));

    await saveMenuItems(menuItems);
  }
  return menuItems;
}
  
