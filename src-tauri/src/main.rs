// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use haseo::lib::compare;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn compare_contents(left: &str, right: &str) -> String {
    let lft = left.to_string();
    let rgt = right.to_string();
    format!("{}", compare(lft, rgt, true).join("\n"))
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![compare_contents])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
