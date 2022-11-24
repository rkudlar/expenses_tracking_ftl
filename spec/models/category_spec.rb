require 'rails_helper'

RSpec.describe Category, type: :model do
  subject { create(:category) }

  it { expect(subject).to be_valid }

  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to validate_uniqueness_of(:name) }
  it { is_expected.to have_many(:spent_records) }
end
