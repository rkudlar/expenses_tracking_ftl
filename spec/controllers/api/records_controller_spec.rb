require 'rails_helper'

RSpec.describe Api::RecordsController, type: :controller do
  render_views

  describe '#index' do
    context 'when the user is authorized' do
      before do
        sign_in record.user
        get :index, format: 'json'
      end

      let(:record) { create(:record) }

      it { expect(response).to have_http_status(:ok) }
      it { expect(response.body).to include(record.spent.to_s) }
      it { expect(response.body).to include(record.description) }
      it { expect(response.body).to include(record.category.name) }
      it { expect(response.media_type).to eq('application/json') }
    end

    context 'when the user is not authorized' do
      before do
        get :index, format: 'json'
      end

      it { expect(response).to have_http_status(:unauthorized) }
    end
  end

  describe '#edit' do
    before do
      sign_in record.user
      get :edit, params: { id: record.id }, format: 'json'
    end

    let(:record) { create(:record) }

    it { expect(response).to have_http_status(:ok) }
    it { expect(response.body).to include(record.spent.to_s) }
    it { expect(response.body).to include(record.description) }
    it { expect(response.body).to include(record.category.id.to_s) }
    it { expect(response.body).to include(record.category.name) }
    it { expect(response.media_type).to eq('application/json') }
  end

  describe '#create' do
    before do
      sign_in user
      post :create, params: params
    end

    let(:user) { create(:user) }
    let(:category) { create(:category) }
    let(:params) { { record: { spent: 100, user_id: user.id, category_id: category.id } } }

    it { expect(response).to have_http_status(:see_other) }
    it { expect(assigns[:record]).to be_instance_of(Record) }
    it { expect(assigns[:record].spent).to eq(100) }
    it { expect(assigns[:record].user_id).to eq(user.id) }
    it { expect(assigns[:record].category_id).to eq(category.id) }
  end

  describe '#update' do
    before do
      sign_in record.user
      patch :update, params: params
    end

    let(:record) { create(:record) }
    let(:params) { { id: record.id, record: { spent: 100 } } }

    it { expect(response).to have_http_status(:see_other) }
    it { expect(assigns[:record].spent).to eq(100) }
    it { is_expected.to redirect_to(root_path) }
  end

  describe '#destroy' do
    before do
      sign_in record.user
    end

    let!(:record) { create(:record) }

    it { expect { delete :destroy, params: { id: record.id } }.to change(Record, :count).by(-1) }
  end
end
