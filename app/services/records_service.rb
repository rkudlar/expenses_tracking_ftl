class RecordsService < ApplicationService
  def initialize(owner_id, current_user)
    super
    @current_user_id = current_user.id
    @owner = User.find(owner_id.to_i) unless owner_id.nil?
  end

  def call
    if @owner.nil?
      my_records
    else
      shared_with_me_records
    end
  end

  private

  def my_records
    Record.where(user_id: @current_user_id).order('created_at DESC')
  end

  def shared_with_me_records
    @owner.records.order('created_at DESC') if @owner.share_with.include? @current_user_id
  end
end
