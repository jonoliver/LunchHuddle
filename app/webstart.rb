require 'rubygems'
require 'sinatra'
require 'haml'
require 'action_mailer'

ActionMailer::Base.smtp_settings = {
  :address => "smtp.sendgrid.net",
  :port => '25',
  :domain => ENV['SENDGRID_DOMAIN'],
  :authentication => :plain,
  :user_name => ENV['SENDGRID_USERNAME'],
  :password => ENV['SENDGRID_PASSWORD']
}

class MyMailer < ActionMailer::Base
 def email
         mail(
          :to         => "mrhask@gmail.com",
          :from       => "app760353@heroku.com",
          :subject    => "test email",
          :body       => "test email from lunchhuddle via heroke/sendgrid"
         )
  end
end

get '/' do
  @huddle = params[:huddle]
  @huddle ||= 'lunch_huddle'

  @log_toggle = params[:log_toggle]
  @log_toggle ||= 'n'

  haml :index
end

get '/userinfo' do
  @huddle = params[:huddle]
  haml :userinfo
end

get '/huddle' do
  @huddle = params[:huddle]
  @huddle ||= 'lunch_huddle'
  haml :huddle
end

get '/utility' do
  @huddle = params[:huddle]
  @huddle ||= 'lunch_huddle'
  haml :utility
end

get '/huddle/invite' do
  MyMailer.email.deliver
  'eddie would go'
end

