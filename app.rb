require 'sinatra'
require 'ims/lti'
require 'haml'
require 'base64'
require 'mongoid'

require_relative 'models/resposta'

configure do
  set :environment, :production
  enable :logging

  Mongoid.load!("./config/mongoid.yml")
end

get '/' do
  @ra = params[:r]
  haml :index
end

post '/submit' do
  begin
    Resposta.create!({
      :ra           => Base64.decode64(params['ra']),
      :dataInicio   => params['dataInicio'],
      :dataTermino  => params['dataTermino'],
      :pergunta1    => params['pergunta1'],
      :pergunta2    => params['pergunta2'],
      :pergunta3    => params['pergunta3'],
      :pergunta4    => params['pergunta4'],
      :pergunta5    => params['pergunta5']
    })
    logger.info("REA-DEFICIENCIA :: Resposta enviada com sucesso! "\
                "Parâmetros: #{params.inspect}. "\
                "Usuário: #{request.user_agent}")
  rescue => e
    logger.fatal("REA-DEFICIENCIA :: Exceção ao enviar resposta: #{e.message}. "\
                 "Parâmetros: #{params.inspect}. "\
                 "Usuário: #{request.user_agent}")
  end

end
