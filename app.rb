require 'sinatra'
require 'ims/lti'
require 'haml'
require 'base64'
require 'mongoid'

require_relative 'models/resposta'

configure do
  set :environment, :production
  Mongoid.load!("./config/mongoid.yml")
end

get '/' do
  @ra = Base64.decode64(params[:r]) if params[:r]
  haml :index
end

post '/submit' do
  begin
    Resposta.create!({
      :ra           => params['ra'],
      :dataInicio   => params['dataInicio'],
      :dataTermino  => params['dataTermino'],
      :pergunta1    => params['pergunta1'],
      :pergunta2    => params['pergunta2'],
      :pergunta3    => params['pergunta3'],
      :pergunta4    => params['pergunta4'],
      :pergunta5    => params['pergunta5']
    })
  rescue => e     
    return { :status => :exception, :message =>  e.message }.to_json
  end

  return { :status => :ok }.to_json 
end
