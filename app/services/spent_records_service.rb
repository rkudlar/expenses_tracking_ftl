class SpentRecordsService < ApplicationService
  def initialize(params, current_user)
    super
    @current_user = current_user
    @params = params
    @category_id = JSON.parse(params[:category])['id'] unless params[:category].blank?
  end

  def call
    if @params[:owner_id].nil?
      records_mapper(@current_user)
    else
      owner = User.find(@params[:owner_id].to_i)
      return unless owner.share_with.include? @current_user.id

      records_mapper(owner)
    end
  end

  private

  def records_mapper(user)
    user.spent_records.order('created_at DESC').select do |record|
      (!@params[:from].blank? ? record.spent >= @params[:from].to_i : true) &&
      (!@params[:to].blank? ? record.spent <= @params[:to].to_i : true) &&
      (!@category_id.blank? ? record.category_id == @category_id : true)
    end
  end
end
