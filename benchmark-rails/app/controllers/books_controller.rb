class BooksController < ApplicationController
  before_action :set_book, only: [:show, :update, :destroy]

  # GET /modelview/books
  def index
    @books = Book.all
  end

  # GET /modelview/books/new
  def new
    @book = Book.new
  end

  # POST /modelview/books
  def create
    @book = Book.new(book_params)
    if @book.save
      flash[:success] = "Book created successfully"
      redirect_to book_path(@book)
    else
      render "new"
    end
  end

  # GET /modelview/books/:id
  def show
  end

  # PATCH/PUT /modelview/books/:id
  def update
    if @book.update(book_params)
      flash[:success] = "Book updated successfully"
      redirect_to book_path(@book)
    else
      render 'show'
    end
  end

  # DELETE /modelview/books/:id
  def destroy
    @book.destroy
    flash[:success] = "Book deleted successfully"
    redirect_to books_path
  end

  private
  def set_book
    @book = Book.find(params[:id])
  end
  
  def book_params
    params.require(:book).permit(:title, :description, :year, :author_id)  
  end
end