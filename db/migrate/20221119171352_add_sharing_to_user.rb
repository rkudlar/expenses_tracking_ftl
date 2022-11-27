class AddSharingToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :share_with, :integer, array: true, default: []
  end
end
