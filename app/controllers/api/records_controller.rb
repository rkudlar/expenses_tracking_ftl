module Api
  class RecordsController < ApplicationController
    def index
      @records = RecordsService.call(params[:owner_id], current_user)
    end

    def edit
      record
    end

    def create
      @record = Record.new(record_params.merge(user_id: current_user.id))
      if @record.save
        flash[:success] = 'Created!'
        redirect_to root_path, status: 303
      else
        flash[:danger] = 'Incorrect!'
      end
    end

    def update
      if record.update(record_params)
        flash[:success] = 'Updated!'
        redirect_to root_path, status: 303
      else
        flash[:danger] = 'Incorrect!'
      end
    end

    def destroy
      record.destroy!
    end

    private

    def record_params
      params.require(:record).permit(:spent, :description, :category_id, :user_id)
    end

    def record
      @record = current_user.records.find(params[:id])
    end
  end
end
