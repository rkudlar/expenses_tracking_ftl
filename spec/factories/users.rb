FactoryBot.define do
  factory :user do
    email     { Faker::Internet.email }
    username  { Faker::Internet.username(specifier: 5) }
    password  { Faker::Internet.password(min_length: 8) }

    trait :with_invalid_email do
      email { '' }
    end

    trait :with_invalid_username do
      username { nil }
    end

    trait :with_invalid_password do
      password { 'pass' }
    end
  end
end
