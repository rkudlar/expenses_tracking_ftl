require 'rails_helper'

RSpec.feature 'User sign in', type: :feature do
  let(:user) { create(:user) }

  scenario 'sign in as a user' do
    visit new_user_session_path
    within('#new_user') do
      fill_in 'user_username', with: user.username
      fill_in 'user_password', with: user.password
    end
    click_button('Log in')
    expect(current_path).to eq(root_path)
  end
end
