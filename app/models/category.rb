class Category < ApplicationRecord
  has_many :spent_records

  validates :name, uniqueness: true, presence: true
end
