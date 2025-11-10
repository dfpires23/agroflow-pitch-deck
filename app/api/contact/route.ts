import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { z } from 'zod'

// Validação do formulário
const contactSchema = z.object({
  name: z.string().min(2, 'Nome muito curto'),
  email: z.string().email('Email inválido'),
  message: z.string().min(10, 'Mensagem muito curta'),
})

type ContactForm = z.infer<typeof contactSchema>

// Mapear erros SMTP para mensagens amigáveis
const getErrorMessage = (error: unknown, language: string = 'pt'): string => {
  const messages = {
    pt: {
      EAUTH: 'Erro de autenticação SMTP. Verifique suas credenciais de email.',
      ECONNREFUSED: 'Não conseguimos conectar ao servidor de email. Tente novamente mais tarde.',
      ETIMEDOUT: 'Timeout na conexão com o servidor. Tente novamente.',
      default: 'Erro ao enviar email. Nossa equipa foi notificada.',
    },
    en: {
      EAUTH: 'SMTP authentication error. Please check your email credentials.',
      ECONNREFUSED: 'Could not connect to email server. Please try again later.',
      ETIMEDOUT: 'Email server connection timeout. Please try again.',
      default: 'Error sending email. Our team has been notified.',
    },
  }

  const lang = messages[language as keyof typeof messages] || messages.en

  if (error instanceof Error) {
    const code = (error as NodeJS.ErrnoException).code as keyof typeof lang
    if (code && code in lang) {
      return lang[code]
    }
  }

  return lang.default
}

// Configurar transportador SMTP
const createTransporter = (): nodemailer.Transporter => {
  const requiredEnvVars = {
    SMTP_HOST: process.env['SMTP_HOST'],
    SMTP_PORT: process.env['SMTP_PORT'],
    SMTP_USER: process.env['SMTP_USER'],
    SMTP_PASS: process.env['SMTP_PASS'],
    EMAIL_FROM: process.env['EMAIL_FROM'],
  }

  const missing = Object.entries(requiredEnvVars)
    .filter(([, value]) => !value)
    .map(([key]) => key)

  if (missing.length > 0) {
    throw new Error(`Variáveis de ambiente faltando: ${missing.join(', ')}`)
  }

  return nodemailer.createTransport({
    host: process.env['SMTP_HOST'],
    port: parseInt(process.env['SMTP_PORT'] || '587', 10),
    secure: process.env['SMTP_PORT'] === '465',
    auth: {
      user: process.env['SMTP_USER'],
      pass: process.env['SMTP_PASS'],
    },
    connectionTimeout: 10000,
    socketTimeout: 10000,
  })
}

// Template de email para o proprietário
const getOwnerEmailTemplate = (data: ContactForm): string => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #04653B 0%, #1A4D34 100%); padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
        <h1 style="color: #ffffff; margin: 0;">Nova Solicitação de Demonstração</h1>
      </div>
      
      <div style="background: #f5f5f5; padding: 30px; border-radius: 0 0 8px 8px;">
        <h2 style="color: #04653B; margin-top: 0;">Detalhes do Contacto:</h2>
        
        <p><strong>Nome:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>
        
        <h3 style="color: #04653B; margin-top: 30px;">Mensagem:</h3>
        <p style="background: #ffffff; padding: 15px; border-left: 4px solid #1EC5FA; border-radius: 4px;">
          ${escapeHtml(data.message).replace(/\n/g, '<br>')}
        </p>
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
        
        <p style="color: #666; font-size: 12px; margin: 0;">
          Esta mensagem foi enviada através do formulário de contacto da AgroFlow.
        </p>
      </div>
    </div>
  `
}

// Template de email para o cliente
const getClientEmailTemplate = (name: string, language: string = 'pt'): string => {
  const templates = {
    pt: {
      subject: 'Obrigado pelo seu interesse - AgroFlow',
      greeting: `Olá ${name},`,
      body: `Recebemos sua solicitação de demonstração e agradecemos o seu interesse na AgroFlow.

Nossa equipa entrará em contacto consigo em breve para agendar uma demonstração personalizada do nosso sistema de irrigação inteligente.

Estamos ansiosos para mostrar como podemos ajudar a otimizar a sua produção agrícola de forma sustentável.`,
      thanks: 'Obrigado pela confiança!',
      team: 'Equipa AgroFlow',
    },
    en: {
      subject: 'Thank you for your interest - AgroFlow',
      greeting: `Hello ${name},`,
      body: `We received your demo request and appreciate your interest in AgroFlow.

Our team will contact you shortly to schedule a personalized demonstration of our smart irrigation system.

We look forward to showing you how we can help optimize your agricultural production sustainably.`,
      thanks: 'Thank you for your trust!',
      team: 'AgroFlow Team',
    },
  }

  const content = templates[language as keyof typeof templates] || templates.en

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #04653B 0%, #1A4D34 100%); padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
        <h1 style="color: #ffffff; margin: 0;">AgroFlow</h1>
        <p style="color: #1EC5FA; margin: 10px 0 0 0;">Irrigação Inteligente</p>
      </div>
      
      <div style="background: #f5f5f5; padding: 30px; border-radius: 0 0 8px 8px;">
        <p>${content.greeting}</p>
        
        <p style="color: #333; line-height: 1.6;">
          ${content.body.replace(/\n/g, '<br>')}
        </p>
        
        <div style="background: #ffffff; padding: 20px; border-radius: 8px; border-left: 4px solid #1EC5FA; margin: 30px 0;">
          <p style="margin: 0; color: #04653B; font-weight: bold;">
            ${content.thanks}
          </p>
        </div>
        
        <p style="color: #333; margin-top: 30px;">
          ${content.team}<br>
          <a href="https://agroflow.pt" style="color: #04653B; text-decoration: none;">www.agroflow.pt</a>
        </p>
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
        
        <p style="color: #999; font-size: 12px; margin: 0; text-align: center;">
          Porto, Portugal
        </p>
      </div>
    </div>
  `
}

// Função para escapar HTML (segurança contra XSS)
const escapeHtml = (text: string): string => {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (char) => map[char] || char)
}

// Verificar configuração do SMTP
async function verifySMTPConfig(): Promise<{ valid: boolean; error?: string }> {
  try {
    const transporter = createTransporter()
    await transporter.verify()
    return { valid: true }
  } catch (error: unknown) {
    console.error('Erro ao verificar SMTP:', error)

    let errorMessage = 'Erro desconhecido na configuração SMTP'

    if (error instanceof Error) {
      const nodeError = error as NodeJS.ErrnoException
      if (nodeError.code === 'EAUTH') {
        errorMessage = 'Erro de autenticação: Verifique SMTP_USER e SMTP_PASS no .env.local'
      } else if (nodeError.code === 'ECONNREFUSED') {
        errorMessage = `Não conseguiu conectar a ${process.env['SMTP_HOST']}:${process.env['SMTP_PORT']}`
      } else if (error.message) {
        errorMessage = error.message
      }
    }

    return { valid: false, error: errorMessage }
  }
}

interface ErrorResponse {
  success: boolean
  error: string
  fields?: Record<string, string>
  details?: string
  debug?: string
}

// Handler POST
export async function POST(request: NextRequest): Promise<NextResponse<ErrorResponse | { success: boolean; message: string }>> {
  try {
    const body = await request.json()

    // Validação dos dados
    const validatedData = contactSchema.parse(body)
    const language = body.language || 'pt'

    // Verificar configuração SMTP
    const smtpCheck = await verifySMTPConfig()
    if (!smtpCheck.valid) {
      console.error('Configuração SMTP inválida:', smtpCheck.error)
      return NextResponse.json(
        {
          success: false,
          error:
            language === 'pt'
              ? 'Erro na configuração de email do servidor. Nossa equipa foi notificada.'
              : 'Error in server email configuration. Our team has been notified.',
          details: smtpCheck.error,
          debug: process.env.NODE_ENV === 'development' ? smtpCheck.error : undefined,
        },
        { status: 500 }
      )
    }

    const transporter = createTransporter()

    // Enviar email para o proprietário
    const ownerMailOptions = {
      from: process.env['EMAIL_FROM'],
      to: process.env['EMAIL_TO'] || process.env['EMAIL_FROM'],
      subject: `Nova Solicitação de Demonstração - ${validatedData.name}`,
      html: getOwnerEmailTemplate(validatedData),
      replyTo: validatedData.email,
    }

    await transporter.sendMail(ownerMailOptions)

    // Enviar email de confirmação para o cliente
    const clientMailOptions = {
      from: process.env['EMAIL_FROM'],
      to: validatedData.email,
      subject:
        language === 'pt'
          ? 'Obrigado pelo seu interesse - AgroFlow'
          : 'Thank you for your interest - AgroFlow',
      html: getClientEmailTemplate(validatedData.name, language),
    }

    await transporter.sendMail(clientMailOptions)

    return NextResponse.json(
      {
        success: true,
        message:
          language === 'pt'
            ? 'Mensagem enviada com sucesso! Verifique sua caixa de entrada e spam.'
            : 'Message sent successfully! Check your inbox and spam folder.',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erro ao enviar email:', error)

    let language = 'pt'
    try {
      const body = await request.json()
      language = body.language || 'pt'
    } catch {
      // Se não conseguir fazer parse, usa padrão
    }

    // Tratamento de erros de validação Zod
    if (error instanceof z.ZodError) {
      const fieldErrors: Record<string, string> = {}
      error.errors.forEach((err) => {
        const path = err.path[0] as string
        fieldErrors[path] = err.message
      })

      return NextResponse.json(
        {
          success: false,
          error:
            language === 'pt'
              ? 'Dados de formulário inválidos'
              : 'Invalid form data',
          fields: fieldErrors,
        },
        { status: 400 }
      )
    }

    // Tratamento de erros SMTP
    if (error instanceof Error) {
      const errorMessage = getErrorMessage(error, language)

      return NextResponse.json(
        {
          success: false,
          error: errorMessage,
          debug:
            process.env.NODE_ENV === 'development' ? error.message : undefined,
        },
        { status: 500 }
      )
    }

    // Erro genérico
    return NextResponse.json(
      {
        success: false,
        error:
          language === 'pt'
            ? 'Erro desconhecido ao enviar email'
            : 'Unknown error sending email',
      },
      { status: 500 }
    )
  }
}

// Endpoint de healthcheck para verificar configuração
export async function GET(): Promise<NextResponse> {
  const check = await verifySMTPConfig()

  if (check.valid) {
    return NextResponse.json(
      { status: 'ok', message: 'SMTP configurado corretamente' },
      { status: 200 }
    )
  }

  return NextResponse.json(
    {
      status: 'error',
      message: 'SMTP não configurado corretamente',
      error: check.error,
    },
    { status: 500 }
  )
}