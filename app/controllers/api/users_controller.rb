module Api
  class UsersController < ApplicationController
    def share_with
      @users = User.where(id: current_user.share_with)
    end

    def access_to
      @users = User.select { |user| user.share_with.include?(current_user.id) }
      render 'api/users/share_with'
    end

    def start_sharing
      user_id = User.find_by(username: params[:username]).id
      current_user.share_with << user_id
      current_user.save!
    end

    def stop_sharing
      current_user.share_with.delete(params[:id].to_i)
      current_user.save!
    end
  end
end