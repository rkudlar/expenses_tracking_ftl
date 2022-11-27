require 'rails_helper'

RSpec.describe User, type: :model do
  context 'when user valid' do
    let(:user) { create(:user) }
    it { expect(user).to be_valid }
  end

  context 'when invalid email' do
    let(:user) { build :user, :with_invalid_email }
    it { expect(user).to_not be_valid }
  end

  context 'when invalid username' do
    let(:user) { build :user, :with_invalid_username }
    it { expect(user).to_not be_valid }
  end

  context 'when invalid password' do
    let(:user) { build :user, :with_invalid_password }
    it { expect(user).to_not be_valid }
  end
end
