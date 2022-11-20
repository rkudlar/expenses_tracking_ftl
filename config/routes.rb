Rails.application.routes.draw do
  devise_for :users
  root 'root#index'

  namespace :api, defaults: { format: 'json' } do
    resources :records, only: %i[index edit create update destroy]
    resources :categories, only: %i[index]
    get 'users/share_with', to: 'users#share_with'
    get 'users/access_to', to: 'users#access_to'
    patch 'users/start_sharing', to: 'users#start_sharing', as: 'start_sharing'
    patch 'users/stop_sharing/:id', to: 'users#stop_sharing', as: 'stop_sharing'
  end

  get '*path', to: 'root#index'
end
