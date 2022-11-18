User.create([{ email: 'user@example.com', username: 'username', password: 'password' }]) if Rails.env.development?
Category.create([{ name: 'Food' }])
Category.create([{ name: 'Clothing' }])
Category.create([{ name: 'Traveling' }])
Category.create([{ name: 'Education' }])
Category.create([{ name: 'Vacation' }])
Category.create([{ name: 'Transport' }])
Category.create([{ name: 'Other' }])
