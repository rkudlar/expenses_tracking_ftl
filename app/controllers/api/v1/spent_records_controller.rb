module Api
  module V1
    class SpentRecordsController < ApplicationController
      def index
        @spent_records = SpentRecordsService.call(params, current_user)
      end

      def edit
        spent_record
      end

      def create
        @spent_record = SpentRecord.new(spent_record_params.merge(user_id: current_user.id))
        head 200 if @spent_record.save
      end

      def update
        head 200 if spent_record.update(spent_record_params)
      end

      def destroy
        spent_record.destroy
      end

      private

      def spent_record_params
        params.require(:spent_record).permit(:spent, :description, :category_id, :user_id)
      end

      def spent_record
        @spent_record = current_user.spent_records.find(params[:id])
      end
    end
  end
end
