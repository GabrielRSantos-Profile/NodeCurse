import { Request, Response } from 'express';

interface User {
  id: number;
  name: string;
  email: string;
}

export class UserController {
  private users: User[] = [];
  private currentId = 1;

  getAll = (req: Request, res: Response) => {
    res.json(this.users);
  };

  getById = (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    
    const foundUser = this.users.find(u => u.id === id);
    
    if (!foundUser) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    
    res.json(foundUser);
  };

  create = (req: Request, res: Response) => {
    const { name, email } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ error: 'Name e email são obrigatórios' });
    }
    
    const newUser: User = {
      id: this.currentId++,
      name,
      email
    };
    
    this.users.push(newUser);
    res.status(201).json(newUser);
  };

  update = (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    
    const { name, email } = req.body;
    
    const userIndex = this.users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    
    this.users[userIndex] = { ...this.users[userIndex], name, email };
    res.json(this.users[userIndex]);
  };

  delete = (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    
    const userIndex = this.users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    
    this.users.splice(userIndex, 1);
    res.status(204).send();
  };
}