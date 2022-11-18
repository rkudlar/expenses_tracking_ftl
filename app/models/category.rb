class Category < ApplicationRecord
  has_many :records

  validates :name, uniqueness: true
end
