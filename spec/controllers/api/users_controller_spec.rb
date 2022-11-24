require 'rails_helper'

RSpec.describe Api::V1::UsersController, type: :controller do
  render_views

  let!(:user_1) { create(:user, share_with: [user_2.id]) }
  let!(:user_2) { create(:user) }

  describe '#share_with' do
    before do
      sign_in user_1
      get :share_with, format: 'json'
    end

    it { expect(response).to have_http_status(:ok) }
    it { expect(response.body).to include(user_2.id.to_s) }
    it { expect(response.body).to include(user_2.username) }
    it { expect(response.body).to include(user_2.email) }
    it { expect(response.media_type).to eq('application/json') }
  end

  describe '#access_to' do
    before do
      sign_in user_2
      get :access_to, format: 'json'
    end

    it { expect(response).to have_http_status(:ok) }
    it { expect(response.body).to include(user_1.id.to_s) }
    it { expect(response.body).to include(user_1.username) }
    it { expect(response.body).to include(user_1.email) }
    it { expect(response.media_type).to eq('application/json') }
    it { is_expected.to render_template('api/v1/users/share_with') }
  end

  describe '#start_sharing' do
    before do
      sign_in user_2
      patch :start_sharing, params: { username: user_1.username }, format: 'json'
    end

    it { expect(User.find_by(id: user_2.id).share_with).to eq([user_1.id]) }
  end

  describe '#stop_sharing' do
    before do
      sign_in user_1
      patch :stop_sharing, params: { id: user_2.id }, format: 'json'
    end

    it { expect(User.find_by(id: user_1.id).share_with).to eq([]) }
  end
end
