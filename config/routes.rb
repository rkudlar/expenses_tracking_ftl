Rails.application.routes.draw do
  devise_for :users
  root 'root#index'

  get '*path', to: 'root#index'
end
