FactoryBot.define do
  factory :record do
    spent       { Faker::Commerce.price }
    description { Faker::Lorem.sentence }
    association :category
    association :user
  end
end
