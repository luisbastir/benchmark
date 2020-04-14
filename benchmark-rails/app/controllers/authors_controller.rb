class AuthorsController < ApplicationController

  before_action :set_author, only: [:show, :update, :destroy]

  # GET /modelview/authors
  def index
    @authors = Author.all
  end

  # GET /modelview/authors/new
  def new
    @author = Author.new
  end

  # POST /modelview/authors
  def create
    @author = Author.new(author_params)
    if @author.save
      flash[:success] = "Author created successfully"
      redirect_to author_path(@author)
    else
      render "new"
    end
  end

  # GET /modelview/authors/:id
  def show
    @books = @author.books
  end

  # PATCH/PUT /modelview/authors/:id
  def update
    if @author.update(author_params)
      flash[:success] = "Author updated successfully"
      redirect_to author_path(@author)
    else
      render 'show'
    end
  end

  # DELETE /modelview/authors/:id
  def destroy
    @author.destroy
    flash[:success] = "Author deleted successfully"
    redirect_to authors_path
  end

  private
  def set_author
    @author = Author.find(params[:id])
  end
  
  def author_params
    params.require(:author).permit(:first_name, :last_name)  
  end
end