Rails.application.routes.draw do
  devise_for :users
  root 'root#index'

  namespace :api, defaults: { format: 'json' } do
    resources :records, only: %i[index edit create update destroy]
    resources :categories, only: %i[index]
  end

  get '*path', to: 'root#index'
end
