class RenameRecordToSpentRecord < ActiveRecord::Migration[7.0]
  def change
    rename_table :records, :spent_records
  end
end
