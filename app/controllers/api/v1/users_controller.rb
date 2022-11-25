module Api
  module V1
    class UsersController < ApplicationController
      def share_with
        @users = User.where(id: current_user.share_with)
      end

      def access_to
        @users = User.select { |user| user.share_with.include?(current_user.id) }
        render 'api/v1/users/share_with'
      end

      def start_sharing
        user = User.find_by(username: params[:username])
        return if user.nil?

        current_user.share_with << user.id
        head 200 if current_user.save!
      end

      def stop_sharing
        current_user.share_with.delete(params[:id].to_i)
        current_user.save!
      end
    end
  end
end
