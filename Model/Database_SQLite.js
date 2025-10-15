import * as SQLite from 'expo-sqlite';
const API_URL =
  'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/menu-items-by-category.json';
const db = SQLite.openDatabase('little_lemon');


export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'create table if not exists menuitems (id integer primary key not null, uuid text, title text, price text, category text);'
        );
      },
      reject,
      resolve
    );
  });
};

export async function getMenuItems() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('select * from menuitems', [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
};

export function saveMenuItems(menuItems) {
  db.transaction((tx) => {
    tx.executeSql(
      `insert into menuitems (uuid, title, price, category) values ${menuItems
        .map(
          (item) =>
            `('${item.id}', '${item.title}', '${item.price}', '${item.category}')`
        )
        .join(', ')}`
    );
  });
};

export async function filterByQueryAndCategories(query, activeCategories) {
  return new Promise((resolve, reject) => {
    if (!query) {
      db.transaction((tx) => {
        tx.executeSql(
          `select * from menuitems where ${activeCategories
            .map((category) => `category='${category}'`)
            .join(' or ')}`,
          [],
          (_, { rows }) => {
            resolve(rows._array);
          }
        );
      }, reject);
    } else {
      db.transaction((tx) => {
        tx.executeSql(
          `select * from menuitems where (title like '%${query}%') and (${activeCategories
            .map((category) => `category='${category}'`)
            .join(' or ')})`,
          [],
          (_, { rows }) => {
            resolve(rows._array);
          }
        );
      }, reject);
    }
  });
};

export async function fetchMenu() {
  await createTable();
        // 2. Check if data was already stored
   let menuItems = await getMenuItems();

   if (!menuItems.length) {
          // Fetching menu from URL
     const response = await fetch(API_URL);
     const json = await response.json();
     menuItems = json.menu.map((item) => ({
     ...item,
     category: item.category.title,
   }));
          // Storing into database
    await saveMenuItems(menuItems);
  }
  return menuItems;
};

export async function getDishById(id) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM menuitems WHERE id = ?',
        [id],
        (_, { rows }) => {
          resolve(rows._array[0]); // un solo plato
        },
        reject
      );
    });
  });
};