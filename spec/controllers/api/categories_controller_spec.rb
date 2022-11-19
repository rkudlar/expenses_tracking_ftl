require 'rails_helper'

RSpec.describe Api::CategoriesController, type: :controller do
  render_views

  describe '#index' do
    context 'when the user is authorized' do
      let!(:category) { create(:category) }

      before do
        sign_in create(:user)
        get :index, format: 'json'
      end

      it { expect(response).to have_http_status(:ok) }
      it { expect(response.body).to include(category.id.to_s) }
      it { expect(response.body).to include(category.name) }
      it { expect(response.media_type).to eq('application/json') }
    end

    context 'when the user is not authorized' do
      before do
        get :index, format: 'json'
      end

      it { expect(response).to have_http_status(:unauthorized) }
    end
  end
end
