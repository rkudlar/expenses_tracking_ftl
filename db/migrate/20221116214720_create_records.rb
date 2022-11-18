class CreateRecords < ActiveRecord::Migration[7.0]
  def change
    create_table :records do |t|
      t.float :spent, null: false
      t.string :description
      t.integer :category_id, null: false
      t.integer :user_id, null: false

      t.timestamps
    end
  end
end
