User.create([{ email: 'user@example.com', username: 'username', password: 'password' }]) if Rails.env.development?
Category.create([{ name: 'Їжа' }])
Category.create([{ name: 'Одяг' }])
Category.create([{ name: 'Подорожі' }])
Category.create([{ name: 'Освіта' }])
Category.create([{ name: 'Відпочинок' }])
Category.create([{ name: 'Транспорт' }])
Category.create([{ name: 'Інше' }])
