Rails.application.routes.draw do
  root 'root#index'

  get '*path', to: 'root#index'
end
