class ModelViewTables < ActiveRecord::Migration[6.0]
  def change
    create_table :authors do |t|
      t.string :first_name
      t.string :last_name
    end

    create_table :books do |t|
      t.string :title
      t.string :description
      t.integer :year
      t.integer :author_id
    end
  end
end
