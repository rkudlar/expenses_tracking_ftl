class Record < ApplicationRecord
  belongs_to :category
  belongs_to :user

  validates :spent, numericality: { greater_than: 0 }
end
