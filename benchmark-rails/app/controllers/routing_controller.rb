class RoutingController < ApplicationController

  # GET /hello
  def hello
    render plain: "Hello World!"
  end

  # GET /hello/json
  def hello_json
    render json: {message: "Hello World!"}
  end

  # GET /hello
  def hello_html
  end

  # GET /hello/msg/:msg
  def msg
    @text = params[:msg]
    render plain: "Hello World! - #{@text}"
  end

  # GET /hello/query
  def query
    @text = params[:msg]
    render plain: "Hello World! - #{@text}"
  end

  # GET /badrequest
  def badrequest
    render plain: "Successful response!", status: :bad_request
  end

  # GET /list
  def list
    @text = ""
    for i in 1..5000 do
      @text += "This is the line #{i}\n"
    end
    render plain: @text
  end
end