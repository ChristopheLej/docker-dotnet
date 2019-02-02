USE [master]
GO

CREATE DATABASE [TaskDB];
GO

USE [TaskDB];
GO

CREATE TABLE [dbo].[Tasks](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](50) NOT NULL,
	[Completed] [bit] NOT NULL,
 CONSTRAINT [PK_Tasks] PRIMARY KEY CLUSTERED 
 (
	[Id] ASC
 )ON [PRIMARY]
) ON [PRIMARY];

ALTER TABLE [dbo].[Tasks] ADD  CONSTRAINT [DF_Tasks_Completed]  DEFAULT ((0)) FOR [Completed]
GO


INSERT INTO [dbo].[Tasks]([Title]) VALUES ('Salut')
INSERT INTO [dbo].[Tasks]([Title]) VALUES ('les gens')