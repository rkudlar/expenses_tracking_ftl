require 'rails_helper'

RSpec.describe Api::V1::SpentRecordsController, type: :controller do
  render_views

  describe '#index' do
    context 'when the user is authorized' do
      before do
        sign_in spent_record.user
        get :index, format: 'json'
      end

      let(:spent_record) { create(:spent_record) }

      it { expect(response).to have_http_status(:ok) }
      it { expect(response.body).to include(spent_record.spent.to_s) }
      it { expect(response.body).to include(spent_record.description) }
      it { expect(response.body).to include(spent_record.category.name) }
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
      sign_in spent_record.user
      get :edit, params: { id: spent_record.id }, format: 'json'
    end

    let(:spent_record) { create(:spent_record) }

    it { expect(response).to have_http_status(:ok) }
    it { expect(response.body).to include(spent_record.spent.to_s) }
    it { expect(response.body).to include(spent_record.description) }
    it { expect(response.body).to include(spent_record.category.id.to_s) }
    it { expect(response.body).to include(spent_record.category.name) }
    it { expect(response.media_type).to eq('application/json') }
  end

  describe '#create' do
    before do
      sign_in user
      post :create, params: params
    end

    let(:user) { create(:user) }
    let(:category) { create(:category) }
    let(:params) { { spent_record: { spent: 100, user_id: user.id, category_id: category.id } } }

    it { expect(response).to have_http_status(:ok) }
    it { expect(assigns[:spent_record]).to be_instance_of(SpentRecord) }
    it { expect(assigns[:spent_record].spent).to eq(100) }
    it { expect(assigns[:spent_record].user_id).to eq(user.id) }
    it { expect(assigns[:spent_record].category_id).to eq(category.id) }
  end

  describe '#update' do
    before do
      sign_in spent_record.user
      patch :update, params: params
    end

    let(:spent_record) { create(:spent_record) }
    let(:params) { { id: spent_record.id, spent_record: { spent: 100 } } }

    it { expect(response).to have_http_status(:ok) }
    it { expect(assigns[:spent_record].spent).to eq(100) }
  end

  describe '#destroy' do
    before do
      sign_in spent_record.user
    end

    let!(:spent_record) { create(:spent_record) }

    it { expect { delete :destroy, params: { id: spent_record.id } }.to change(SpentRecord, :count).by(-1) }
  end
end
