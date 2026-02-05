// Mock API Service for development without backend
export class MockApiService {
  private delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Initialize data from localStorage or default data
  private initializeData() {
    if (!localStorage.getItem('mock_projects')) {
      const defaultProjects = [
        {
          id: 1,
          name: 'Sky Tower',
          location: 'Karachi, Clifton',
          total_units: 120,
          available_units: 45,
          status: 'Active',
          start_date: '2023-01-01',
          end_date: '2025-12-31',
          budget: '$10,000,000',
          project_manager: 'John Doe',
          description: 'Premium residential complex',
          created_at: '2023-01-01T00:00:00Z'
        },
        {
          id: 2,
          name: 'Ocean View',
          location: 'Karachi, Sea View',
          total_units: 85,
          available_units: 23,
          status: 'Under Construction',
          start_date: '2023-06-01',
          end_date: '2025-06-30',
          budget: '$8,500,000',
          project_manager: 'Jane Smith',
          description: 'Beachfront resort',
          created_at: '2023-06-01T00:00:00Z'
        },
        {
          id: 3,
          name: 'Garden City',
          location: 'Karachi, DHA',
          total_units: 200,
          available_units: 67,
          status: 'Active',
          start_date: '2022-03-01',
          end_date: '2024-12-31',
          budget: '$15,000,000',
          project_manager: 'Mike Johnson',
          description: 'Mixed use development',
          created_at: '2022-03-01T00:00:00Z'
        }
      ];
      localStorage.setItem('mock_projects', JSON.stringify(defaultProjects));
    }

    if (!localStorage.getItem('mock_bookings')) {
      const defaultBookings = [
        {
          id: 1,
          customer_name: 'Ali Khan',
          customer_email: 'ali@example.com',
          customer_phone: '+92 300 1234567',
          project_id: 1,
          unit_number: 'ST-501',
          booking_date: '2024-01-15',
          move_in_date: '2024-06-01',
          total_amount: 125000,
          deposit: 12500,
          status: 'Confirmed',
          payment_status: 'Partial Payment'
        },
        {
          id: 2,
          customer_name: 'Fatima Ali',
          customer_email: 'fatima@example.com',
          customer_phone: '+92 300 7654321',
          project_id: 2,
          unit_number: 'OV-302',
          booking_date: '2024-01-18',
          move_in_date: '2024-07-15',
          total_amount: 98500,
          deposit: 9850,
          status: 'Pending',
          payment_status: 'Deposit Paid'
        }
      ];
      localStorage.setItem('mock_bookings', JSON.stringify(defaultBookings));
    }

    if (!localStorage.getItem('mock_inventory')) {
      const defaultInventory = [
        {
          id: 1,
          name: 'Cement Bags',
          category: 'Construction Materials',
          quantity: 150,
          unit: 'bags',
          price: 25.99,
          supplier: 'ABC Construction Supplies',
          description: 'Portland cement for construction',
          last_updated: '2024-01-15'
        },
        {
          id: 2,
          name: 'Steel Rods',
          category: 'Construction Materials',
          quantity: 850,
          unit: 'pieces',
          price: 12.50,
          supplier: 'Steel Supply Co.',
          description: 'Reinforcement steel rods',
          last_updated: '2024-01-14'
        }
      ];
      localStorage.setItem('mock_inventory', JSON.stringify(defaultInventory));
    }

    if (!localStorage.getItem('mock_customers')) {
      const defaultCustomers = [
        {
          id: 1,
          name: 'Ali Khan',
          email: 'ali@example.com',
          phone: '+92 300 1234567',
          projects_count: 2,
          status: 'Active',
          created_at: '2023-01-15'
        },
        {
          id: 2,
          name: 'Fatima Ali',
          email: 'fatima@example.com',
          phone: '+92 300 7654321',
          projects_count: 1,
          status: 'Active',
          created_at: '2023-02-20'
        }
      ];
      localStorage.setItem('mock_customers', JSON.stringify(defaultCustomers));
    }

    if (!localStorage.getItem('mock_payments')) {
      const defaultPayments = [
        {
          id: 1,
          customer_id: 1,
          customer_name: 'Ali Khan',
          project: 'Sky Tower',
          amount: 50000,
          date: '2024-01-15',
          method: 'Bank Transfer',
          status: 'Completed'
        },
        {
          id: 2,
          customer_id: 2,
          customer_name: 'Fatima Ali',
          project: 'Ocean View',
          amount: 35000,
          date: '2024-01-18',
          method: 'Cheque',
          status: 'Processing'
        }
      ];
      localStorage.setItem('mock_payments', JSON.stringify(defaultPayments));
    }
  }

  // Mock login response
  async login(credentials: { username: string; password: string }): Promise<any> {
    await this.delay(500); // Simulate network delay

    // Initialize data if not already present
    this.initializeData();

    // Simple validation
    if (credentials.username === 'admin' && credentials.password === 'password') {
      return {
        access_token: 'mock_access_token_' + Date.now(),
        refresh_token: 'mock_refresh_token_' + Date.now(),
        token_type: 'bearer',
        user: {
          id: 1,
          username: 'admin',
          email: 'admin@example.com',
          first_name: 'Admin',
          last_name: 'User'
        }
      };
    } else if (credentials.username && credentials.password) {
      // Simulate a successful login with dummy data
      return {
        access_token: 'mock_access_token_' + Date.now(),
        refresh_token: 'mock_refresh_token_' + Date.now(),
        token_type: 'bearer',
        user: {
          id: 2,
          username: credentials.username,
          email: `${credentials.username}@example.com`,
          first_name: 'Demo',
          last_name: 'User'
        }
      };
    } else {
      await this.delay(1000); // Simulate failed request delay
      throw new Error('Invalid credentials');
    }
  }

  // Mock register response
  async register(userData: any): Promise<any> {
    await this.delay(800); // Simulate network delay
    return {
      id: Math.floor(Math.random() * 1000),
      ...userData,
      created_at: new Date().toISOString()
    };
  }

  // Mock projects data with persistence
  async getProjects(filters: any = {}): Promise<any[]> {
    await this.delay(200); // Simulate network delay

    // Get projects from localStorage
    const storedProjects = localStorage.getItem('mock_projects');
    const projects = storedProjects ? JSON.parse(storedProjects) : [];

    // Apply filters
    return projects.filter((project: any) => {
      if (filters.status && project.status.toLowerCase() !== filters.status.toLowerCase()) {
        return false;
      }
      if (filters.search && !project.name.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      return true;
    });
  }

  // Mock single project
  async getProject(id: number): Promise<any> {
    await this.delay(100);

    const storedProjects = localStorage.getItem('mock_projects');
    const projects = storedProjects ? JSON.parse(storedProjects) : [];
    const project = projects.find((p: any) => p.id === id);

    if (!project) {
      throw new Error('Project not found');
    }
    return project;
  }

  // Mock create project with persistence
  async createProject(data: any): Promise<any> {
    await this.delay(300);

    const newProject = {
      id: Date.now(), // Use timestamp as unique ID
      ...data,
      created_at: new Date().toISOString()
    };

    // Get existing projects and add new one
    const storedProjects = localStorage.getItem('mock_projects');
    const projects = storedProjects ? JSON.parse(storedProjects) : [];
    projects.push(newProject);

    // Save back to localStorage
    localStorage.setItem('mock_projects', JSON.stringify(projects));

    return newProject;
  }

  // Mock update project with persistence
  async updateProject(id: number, data: any): Promise<any> {
    await this.delay(300);

    // Get existing projects
    const storedProjects = localStorage.getItem('mock_projects');
    const projects = storedProjects ? JSON.parse(storedProjects) : [];

    // Find and update the project
    const projectIndex = projects.findIndex((p: any) => p.id === id);
    if (projectIndex !== -1) {
      projects[projectIndex] = {
        ...projects[projectIndex],
        ...data,
        updated_at: new Date().toISOString()
      };

      // Save back to localStorage
      localStorage.setItem('mock_projects', JSON.stringify(projects));
      return projects[projectIndex];
    } else {
      throw new Error('Project not found');
    }
  }

  // Mock delete project with persistence
  async deleteProject(id: number): Promise<any> {
    await this.delay(300);

    // Get existing projects
    const storedProjects = localStorage.getItem('mock_projects');
    let projects = storedProjects ? JSON.parse(storedProjects) : [];

    // Remove the project
    projects = projects.filter((p: any) => p.id !== id);

    // Save back to localStorage
    localStorage.setItem('mock_projects', JSON.stringify(projects));

    return { success: true, deleted_id: id };
  }

  // Mock bookings data with persistence
  async getBookings(filters: any = {}): Promise<any[]> {
    await this.delay(200);

    const storedBookings = localStorage.getItem('mock_bookings');
    const bookings = storedBookings ? JSON.parse(storedBookings) : [];

    return bookings;
  }

  // Mock create booking with persistence
  async createBooking(data: any): Promise<any> {
    await this.delay(300);

    const newBooking = {
      id: Date.now(), // Use timestamp as unique ID
      ...data,
      created_at: new Date().toISOString()
    };

    // Get existing bookings and add new one
    const storedBookings = localStorage.getItem('mock_bookings');
    const bookings = storedBookings ? JSON.parse(storedBookings) : [];
    bookings.push(newBooking);

    // Save back to localStorage
    localStorage.setItem('mock_bookings', JSON.stringify(bookings));

    return newBooking;
  }

  // Mock update booking with persistence
  async updateBooking(id: number, data: any): Promise<any> {
    await this.delay(300);

    // Get existing bookings
    const storedBookings = localStorage.getItem('mock_bookings');
    let bookings = storedBookings ? JSON.parse(storedBookings) : [];

    // Find and update the booking
    const bookingIndex = bookings.findIndex((b: any) => b.id === id);
    if (bookingIndex !== -1) {
      bookings[bookingIndex] = {
        ...bookings[bookingIndex],
        ...data,
        updated_at: new Date().toISOString()
      };

      // Save back to localStorage
      localStorage.setItem('mock_bookings', JSON.stringify(bookings));
      return bookings[bookingIndex];
    } else {
      throw new Error('Booking not found');
    }
  }

  // Mock delete booking with persistence
  async deleteBooking(id: number): Promise<any> {
    await this.delay(300);

    // Get existing bookings
    const storedBookings = localStorage.getItem('mock_bookings');
    let bookings = storedBookings ? JSON.parse(storedBookings) : [];

    // Remove the booking
    bookings = bookings.filter((b: any) => b.id !== id);

    // Save back to localStorage
    localStorage.setItem('mock_bookings', JSON.stringify(bookings));

    return { success: true, deleted_id: id };
  }

  // Mock get single booking
  async getBooking(id: number): Promise<any> {
    await this.delay(100);

    const storedBookings = localStorage.getItem('mock_bookings');
    const bookings = storedBookings ? JSON.parse(storedBookings) : [];
    const booking = bookings.find((b: any) => b.id === id);

    if (!booking) {
      throw new Error('Booking not found');
    }
    return booking;
  }

  // Mock inventory data with persistence
  async getInventory(filters: any = {}): Promise<any[]> {
    await this.delay(200);

    const storedInventory = localStorage.getItem('mock_inventory');
    const inventory = storedInventory ? JSON.parse(storedInventory) : [];

    return inventory;
  }

  // Mock get single inventory item
  async getInventoryItem(id: number): Promise<any> {
    await this.delay(100);

    const storedInventory = localStorage.getItem('mock_inventory');
    const inventory = storedInventory ? JSON.parse(storedInventory) : [];
    const item = inventory.find((i: any) => i.id === id);

    if (!item) {
      throw new Error('Inventory item not found');
    }
    return item;
  }

  // Mock create inventory with persistence
  async createInventory(data: any): Promise<any> {
    await this.delay(300);

    const newInventory = {
      id: Date.now(), // Use timestamp as unique ID
      ...data,
      created_at: new Date().toISOString()
    };

    // Get existing inventory and add new one
    const storedInventory = localStorage.getItem('mock_inventory');
    const inventory = storedInventory ? JSON.parse(storedInventory) : [];
    inventory.push(newInventory);

    // Save back to localStorage
    localStorage.setItem('mock_inventory', JSON.stringify(inventory));

    return newInventory;
  }

  // Mock update inventory with persistence
  async updateInventory(id: number, data: any): Promise<any> {
    await this.delay(300);

    // Get existing inventory
    const storedInventory = localStorage.getItem('mock_inventory');
    let inventory = storedInventory ? JSON.parse(storedInventory) : [];

    // Find and update the inventory item
    const inventoryIndex = inventory.findIndex((i: any) => i.id === id);
    if (inventoryIndex !== -1) {
      inventory[inventoryIndex] = {
        ...inventory[inventoryIndex],
        ...data,
        updated_at: new Date().toISOString()
      };

      // Save back to localStorage
      localStorage.setItem('mock_inventory', JSON.stringify(inventory));
      return inventory[inventoryIndex];
    } else {
      throw new Error('Inventory item not found');
    }
  }

  // Mock delete inventory with persistence
  async deleteInventory(id: number): Promise<any> {
    await this.delay(300);

    // Get existing inventory
    const storedInventory = localStorage.getItem('mock_inventory');
    let inventory = storedInventory ? JSON.parse(storedInventory) : [];

    // Remove the inventory item
    inventory = inventory.filter((i: any) => i.id !== id);

    // Save back to localStorage
    localStorage.setItem('mock_inventory', JSON.stringify(inventory));

    return { success: true, deleted_id: id };
  }

  // Mock customers data with persistence
  async getCustomers(filters: any = {}): Promise<any[]> {
    await this.delay(200);

    const storedCustomers = localStorage.getItem('mock_customers');
    const customers = storedCustomers ? JSON.parse(storedCustomers) : [];

    return customers;
  }

  // Mock payments data with persistence
  async getPayments(filters: any = {}): Promise<any[]> {
    await this.delay(200);

    const storedPayments = localStorage.getItem('mock_payments');
    const payments = storedPayments ? JSON.parse(storedPayments) : [];

    return payments;
  }

  // Mock create payment with persistence
  async createPayment(data: any): Promise<any> {
    await this.delay(300);

    const newPayment = {
      id: Date.now(), // Use timestamp as unique ID
      ...data,
      created_at: new Date().toISOString()
    };

    // Get existing payments and add new one
    const storedPayments = localStorage.getItem('mock_payments');
    const payments = storedPayments ? JSON.parse(storedPayments) : [];
    payments.push(newPayment);

    // Save back to localStorage
    localStorage.setItem('mock_payments', JSON.stringify(payments));

    return newPayment;
  }

  // Mock update payment with persistence
  async updatePayment(id: number, data: any): Promise<any> {
    await this.delay(300);

    // Get existing payments
    const storedPayments = localStorage.getItem('mock_payments');
    let payments = storedPayments ? JSON.parse(storedPayments) : [];

    // Find and update the payment
    const paymentIndex = payments.findIndex((p: any) => p.id === id);
    if (paymentIndex !== -1) {
      payments[paymentIndex] = {
        ...payments[paymentIndex],
        ...data,
        updated_at: new Date().toISOString()
      };

      // Save back to localStorage
      localStorage.setItem('mock_payments', JSON.stringify(payments));
      return payments[paymentIndex];
    } else {
      throw new Error('Payment not found');
    }
  }

  // Mock delete payment with persistence
  async deletePayment(id: number): Promise<any> {
    await this.delay(300);

    // Get existing payments
    const storedPayments = localStorage.getItem('mock_payments');
    let payments = storedPayments ? JSON.parse(storedPayments) : [];

    // Remove the payment
    payments = payments.filter((p: any) => p.id !== id);

    // Save back to localStorage
    localStorage.setItem('mock_payments', JSON.stringify(payments));

    return { success: true, deleted_id: id };
  }

  // Initialize customers if not present
  private initializeCustomers() {
    if (!localStorage.getItem('mock_customers')) {
      const defaultCustomers = [
        {
          id: 1,
          first_name: 'Ali',
          last_name: 'Khan',
          email: 'ali@example.com',
          phone: '+92 300 1234567',
          address: 'Street 1, Karachi',
          city: 'Karachi',
          state: 'Sindh',
          zip_code: '75000',
          country: 'Pakistan',
          occupation: 'Engineer',
          status: 'Active',
          created_at: '2023-01-15'
        },
        {
          id: 2,
          first_name: 'Fatima',
          last_name: 'Ali',
          email: 'fatima@example.com',
          phone: '+92 300 7654321',
          address: 'Street 2, Lahore',
          city: 'Lahore',
          state: 'Punjab',
          zip_code: '54000',
          country: 'Pakistan',
          occupation: 'Doctor',
          status: 'Active',
          created_at: '2023-02-20'
        }
      ];
      localStorage.setItem('mock_customers', JSON.stringify(defaultCustomers));
    }
  }

  // Mock create customer with persistence
  async createCustomer(data: any): Promise<any> {
    await this.delay(300);

    // Initialize customers if not already done
    this.initializeCustomers();

    const newCustomer = {
      id: Date.now(), // Use timestamp as unique ID
      ...data,
      created_at: new Date().toISOString()
    };

    // Get existing customers and add new one
    const storedCustomers = localStorage.getItem('mock_customers');
    const customers = storedCustomers ? JSON.parse(storedCustomers) : [];
    customers.push(newCustomer);

    // Save back to localStorage
    localStorage.setItem('mock_customers', JSON.stringify(customers));

    return newCustomer;
  }

  // Mock update customer with persistence
  async updateCustomer(id: number, data: any): Promise<any> {
    await this.delay(300);

    // Initialize customers if not already done
    this.initializeCustomers();

    // Get existing customers
    const storedCustomers = localStorage.getItem('mock_customers');
    let customers = storedCustomers ? JSON.parse(storedCustomers) : [];

    // Find and update the customer
    const customerIndex = customers.findIndex((c: any) => c.id === id);
    if (customerIndex !== -1) {
      customers[customerIndex] = {
        ...customers[customerIndex],
        ...data,
        updated_at: new Date().toISOString()
      };

      // Save back to localStorage
      localStorage.setItem('mock_customers', JSON.stringify(customers));
      return customers[customerIndex];
    } else {
      throw new Error('Customer not found');
    }
  }

  // Mock delete customer with persistence
  async deleteCustomer(id: number): Promise<any> {
    await this.delay(300);

    // Initialize customers if not already done
    this.initializeCustomers();

    // Get existing customers
    const storedCustomers = localStorage.getItem('mock_customers');
    let customers = storedCustomers ? JSON.parse(storedCustomers) : [];

    // Remove the customer
    customers = customers.filter((c: any) => c.id !== id);

    // Save back to localStorage
    localStorage.setItem('mock_customers', JSON.stringify(customers));

    return { success: true, deleted_id: id };
  }

  // Mock customers data with persistence
  async getCustomers(filters: any = {}): Promise<any[]> {
    await this.delay(200);

    // Initialize customers if not already done
    this.initializeCustomers();

    const storedCustomers = localStorage.getItem('mock_customers');
    const customers = storedCustomers ? JSON.parse(storedCustomers) : [];

    return customers;
  }

  // Mock get single customer
  async getCustomer(id: number): Promise<any> {
    await this.delay(100);

    // Initialize customers if not already done
    this.initializeCustomers();

    const storedCustomers = localStorage.getItem('mock_customers');
    const customers = storedCustomers ? JSON.parse(storedCustomers) : [];
    const customer = customers.find((c: any) => c.id === id);

    if (!customer) {
      throw new Error('Customer not found');
    }
    return customer;
  }

  // Mock get single payment
  async getPayment(id: number): Promise<any> {
    await this.delay(100);

    const storedPayments = localStorage.getItem('mock_payments');
    const payments = storedPayments ? JSON.parse(storedPayments) : [];
    const payment = payments.find((p: any) => p.id === id);

    if (!payment) {
      throw new Error('Payment not found');
    }
    return payment;
  }
}

export const mockApiService = new MockApiService();