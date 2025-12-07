import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const { toast } = useToast();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState('home');
  const [deliveryMethod, setDeliveryMethod] = useState('standard');
  const [address, setAddress] = useState('');

  const products: Product[] = [
    { id: 1, name: 'Часы Howard Miller', price: 12900, category: 'Настенные', image: 'https://cdn.poehali.dev/files/2.jpg' },
    { id: 2, name: 'Классические часы', price: 8500, category: 'Настенные', image: 'https://cdn.poehali.dev/files/3.jpg' },
    { id: 3, name: 'Часы с минутными делениями', price: 9200, category: 'Настенные', image: 'https://cdn.poehali.dev/files/5.jpg' },
    { id: 4, name: 'Синие кварцевые часы', price: 6700, category: 'Настенные', image: 'https://cdn.poehali.dev/files/1.jpg' },
    { id: 5, name: 'Эскизные часы', price: 4500, category: 'Настенные', image: 'https://cdn.poehali.dev/files/5310077877657209674.jpg' },
    { id: 6, name: 'Элегантные часы', price: 11900, category: 'Настенные', image: 'https://cdn.poehali.dev/files/2.jpg' },
  ];

  const reviews = [
    { name: 'Анна К.', text: 'Купили часы для офиса — идеальное качество! Точный ход, красивый дизайн.', rating: 5 },
    { name: 'Михаил П.', text: 'Часы Howard Miller превзошли ожидания. Классика, которая никогда не выйдет из моды.', rating: 5 },
    { name: 'Елена С.', text: 'Заказывала настенные часы для гостиной. Пришли быстро, упакованы отлично!', rating: 5 },
  ];

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    toast({
      title: 'Товар добавлен',
      description: `${product.name} добавлен в корзину`,
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, change: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }).filter((item) => item.quantity > 0)
    );
  };

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateDelivery = () => {
    const subtotal = calculateSubtotal();
    if (subtotal === 0) return 0;
    
    switch (deliveryMethod) {
      case 'express':
        return 500;
      case 'standard':
        return 300;
      case 'pickup':
        return 0;
      default:
        return 300;
    }
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateDelivery();
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    
    if (!email.includes('@')) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, введите корректный email',
        variant: 'destructive',
      });
      return;
    }
    
    toast({
      title: 'Спасибо за сообщение!',
      description: 'Мы свяжемся с вами в ближайшее время.',
    });
    e.currentTarget.reset();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">TIME STORE</h1>
            <nav className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection('home')}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  activeSection === 'home' ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                Главная
              </button>
              <button
                onClick={() => scrollToSection('catalog')}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  activeSection === 'catalog' ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                Каталог
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  activeSection === 'about' ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                О магазине
              </button>
              <button
                onClick={() => scrollToSection('reviews')}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  activeSection === 'reviews' ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                Отзывы
              </button>
              <button
                onClick={() => scrollToSection('contacts')}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  activeSection === 'contacts' ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                Контакты
              </button>
            </nav>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {cart.reduce((sum, item) => sum + item.quantity, 0)}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-8 flex flex-col gap-6">
                  {cart.length === 0 ? (
                    <div className="text-center text-muted-foreground py-12">
                      <Icon name="ShoppingBag" size={48} className="mx-auto mb-4 opacity-20" />
                      <p>Корзина пуста</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1 overflow-auto space-y-4 max-h-[40vh]">
                        {cart.map((item) => (
                          <div key={item.id} className="flex gap-4 pb-4 border-b">
                            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                            <div className="flex-1">
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="text-sm text-muted-foreground">{item.price.toLocaleString()} ₽</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() => updateQuantity(item.id, -1)}
                                >
                                  <Icon name="Minus" size={14} />
                                </Button>
                                <span className="w-8 text-center text-sm">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() => updateQuantity(item.id, 1)}
                                >
                                  <Icon name="Plus" size={14} />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7 ml-auto"
                                  onClick={() => removeFromCart(item.id)}
                                >
                                  <Icon name="Trash2" size={14} />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="space-y-4">
                        <Separator />
                        <div>
                          <Label className="text-sm font-medium mb-3 block">Способ доставки</Label>
                          <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod}>
                            <div className="flex items-center space-x-2 py-2">
                              <RadioGroupItem value="standard" id="standard" />
                              <Label htmlFor="standard" className="flex-1 cursor-pointer">
                                <div className="flex justify-between">
                                  <span>Стандартная (3-5 дней)</span>
                                  <span className="text-muted-foreground">300 ₽</span>
                                </div>
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2 py-2">
                              <RadioGroupItem value="express" id="express" />
                              <Label htmlFor="express" className="flex-1 cursor-pointer">
                                <div className="flex justify-between">
                                  <span>Экспресс (1-2 дня)</span>
                                  <span className="text-muted-foreground">500 ₽</span>
                                </div>
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2 py-2">
                              <RadioGroupItem value="pickup" id="pickup" />
                              <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                                <div className="flex justify-between">
                                  <span>Самовывоз</span>
                                  <span className="text-muted-foreground">Бесплатно</span>
                                </div>
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                        
                        {deliveryMethod !== 'pickup' && (
                          <div>
                            <Label htmlFor="address" className="text-sm font-medium">Адрес доставки</Label>
                            <Input
                              id="address"
                              placeholder="Введите адрес"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              className="mt-2"
                            />
                          </div>
                        )}
                        
                        <Separator />
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Товары</span>
                            <span>{calculateSubtotal().toLocaleString()} ₽</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Доставка</span>
                            <span>{calculateDelivery().toLocaleString()} ₽</span>
                          </div>
                          <Separator />
                          <div className="flex justify-between font-bold text-lg">
                            <span>Итого</span>
                            <span>{calculateTotal().toLocaleString()} ₽</span>
                          </div>
                        </div>
                        
                        <Button className="w-full" size="lg">
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section id="home" className="py-20 md:py-32 bg-gradient-to-b from-secondary to-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Время имеет значение
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Настенные часы премиум-класса для дома и офиса. Точность, стиль и качество в каждой модели
            </p>
            <Button size="lg" onClick={() => scrollToSection('catalog')} className="gap-2">
              Смотреть каталог
              <Icon name="ArrowRight" size={20} />
            </Button>
          </div>
        </section>

        <section id="catalog" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Каталог товаров</h2>
              <p className="text-muted-foreground">Выбирайте то, что отражает ваш стиль</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                  <div className="aspect-square overflow-hidden bg-secondary">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <Badge variant="secondary" className="mb-2">{product.category}</Badge>
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <p className="text-2xl font-bold">{product.price.toLocaleString()} ₽</p>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button className="w-full" onClick={() => addToCart(product)}>
                      <Icon name="ShoppingCart" size={18} className="mr-2" />
                      В корзину
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">О магазине</h2>
              <p className="text-lg text-muted-foreground mb-6">
                TIME STORE — это специализированный магазин настенных часов премиум-класса. Мы работаем 
                с ведущими производителями, включая Howard Miller, чтобы предложить вам часы, которые 
                сочетают точность швейцарских механизмов с безупречным дизайном.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Каждая модель в нашем каталоге проходит строгий контроль качества. Мы верим, что часы — 
                это не просто прибор для измерения времени, а важная часть интерьера, отражающая ваш 
                стиль и статус. Доставляем по всей России с гарантией качества.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div>
                  <div className="bg-background w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Package" size={32} />
                  </div>
                  <h3 className="font-semibold mb-2">Качество</h3>
                  <p className="text-sm text-muted-foreground">Только проверенные бренды и производители</p>
                </div>
                <div>
                  <div className="bg-background w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Truck" size={32} />
                  </div>
                  <h3 className="font-semibold mb-2">Доставка</h3>
                  <p className="text-sm text-muted-foreground">Быстрая доставка по всей России</p>
                </div>
                <div>
                  <div className="bg-background w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Heart" size={32} />
                  </div>
                  <h3 className="font-semibold mb-2">Забота</h3>
                  <p className="text-sm text-muted-foreground">Индивидуальный подход к каждому клиенту</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="reviews" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Отзывы клиентов</h2>
              <p className="text-muted-foreground">Что говорят о нас наши покупатели</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {reviews.map((review, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="fill-current text-accent" />
                      ))}
                    </div>
                    <p className="text-sm mb-4">{review.text}</p>
                    <p className="font-semibold text-sm">{review.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="contacts" className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Контакты</h2>
                <p className="text-muted-foreground">Свяжитесь с нами любым удобным способом</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-accent text-accent-foreground p-3 rounded-full">
                        <Icon name="Phone" size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Телефон</h3>
                        <a href="tel:+79991234567" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                          +7 (999) 123-45-67
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-accent text-accent-foreground p-3 rounded-full">
                        <Icon name="Mail" size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Email</h3>
                        <a href="mailto:shop@minimal.ru" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                          shop@minimal.ru
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Имя</Label>
                      <Input id="name" name="name" placeholder="Ваше имя" required className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" placeholder="your@email.com" required className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="message">Сообщение</Label>
                      <Textarea id="message" name="message" placeholder="Ваше сообщение" required className="mt-2 min-h-[120px]" />
                    </div>
                    <Button type="submit" className="w-full">
                      Отправить сообщение
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-2">TIME STORE</h3>
              <p className="text-sm opacity-80">© 2024 Все права защищены</p>
            </div>
            
            <div className="flex gap-4">
              <a
                href="https://t.me/minimalshop"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
                aria-label="Telegram"
              >
                <Icon name="Send" size={20} />
              </a>
              <a
                href="https://instagram.com/minimalshop"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Icon name="Instagram" size={20} />
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-background/10 text-center text-sm opacity-80">
            <p>Телефон: <a href="tel:+79991234567" className="hover:opacity-100 transition-opacity">+7 (999) 123-45-67</a></p>
            <p>Email: <a href="mailto:shop@minimal.ru" className="hover:opacity-100 transition-opacity">shop@minimal.ru</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;