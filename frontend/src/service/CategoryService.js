import axios from "axios";

class CategoryService {
  static BASE_URL = "http://localhost:8080";

  static async createCategory(categoryDto) {
    const response = await axios.post(`${CategoryService.BASE_URL}/adminuser/category/create`, categoryDto, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  }

  static async getAllCategories() {
    const response = await axios.get(`${CategoryService.BASE_URL}/adminuser/category/get-all-categories`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  }

  static async getCategoryById(id) {
    const response = await axios.get(`${CategoryService.BASE_URL}/adminuser/category/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  }

  static async updateCategory(id, categoryDto) {
    const response = await axios.put(`${CategoryService.BASE_URL}/adminuser/category/update/${id}`, categoryDto, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  }

  static async deleteCategory(id) {
    await axios.delete(`${CategoryService.BASE_URL}/adminuser/category/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }
}

export default CategoryService;
