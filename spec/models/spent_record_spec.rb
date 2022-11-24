require 'rails_helper'

RSpec.describe SpentRecord, type: :model do
  subject { create(:spent_record) }

  it { expect(subject).to be_valid }

  it { is_expected.to validate_presence_of(:spent) }
  it { is_expected.to validate_numericality_of(:spent).is_greater_than(0) }
  it { is_expected.to belong_to(:category) }
  it { is_expected.to belong_to(:user) }
end
