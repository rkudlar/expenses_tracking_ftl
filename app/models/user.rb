class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :spent_records

  validates :email, uniqueness: true
  validates :username, uniqueness: true, length: { minimum: 5 }
end
